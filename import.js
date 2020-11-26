// Libraries

const fs = require('fs')
const csv = require('csv-parser')
const accents = require('remove-accents')
const dice = require('fast-dice-coefficient')

// Time counter

const start = Date.now()

// Reading data

const results = []
fs.createReadStream('./data/metadata.csv').pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => parse(results))

// Parsing

const parse = (records) => {

    // Filtering and inversion

    records.forEach(record => {

        record.authors = []
        delete record['Type']
        delete record['Volume']
        delete record['Conference/workshop/... title']
        delete record['Special issue']

        for (let a = 1; a <= 5; a++) {

            if (!record['Author ' + a]) continue
            if (record['Author ' + a] == '.') continue

            const obj = {
                name: record['Author ' + a],
                affiliation: record['Affiliation A' + a],
                country: record['Country A' + a],
                gender: record['Gender A' + a],
            }

            delete record['Author ' + a]
            delete record['Affiliation A' + a]
            delete record['Country A' + a]
            delete record['Gender A' + a]

            record.authors.push(obj)

        }

    }, [])



    // Grouping by author

    const authors = records.reduce((authors, record, i) => {

        const year = record['Year']
        let text = `${record['Title']} ${record['Abstract']} `
        author.name.split(' ').forEach(segment => {
            text.replaceAll(segment, ' ')
        })

        const update = author => {
            author.docs++
            author.text += text
            if (author.years[year])
                (author.years[year])++
            else
                (author.years[year]) = 1
        }

        const add = author => {
            author.docs = 1
            author.peers = []
            author.text = text
            author.years = { [year]: 1 }
            author.variants = [author.name]
            authors.push(author)
        }

        record.authors.forEach(author => {

            const same = authors.find(same => same.name === author.name)
            if (same) {
                console.log('update')
                update(same)
            } else {
                console.log('add')
                add(author)
            }

        })

        return authors

    }, [])



    // Add ids

    authors.forEach((author, i) => {
        author.id = i
    })

    // Transform authors into ids

    records.forEach((record, i) => {

        if ((i % 1000) === 0)
            console.log('Setting peers for record #', records.length - i)

        const peers = authors.filter(author => {

            let flag = false

            author.variants.forEach(variant => {
                const found = record.authors.some(a => a.name == author.name)
                if (found) {
                    flag = true
                }
            })

            return flag

        })

        // console.log(peers)

        const ids = peers.map(author => author.id)

        peers.forEach(peer => {
            // console.log('test')
            ids.forEach(id => {
                if (!peer.peers.includes(id)) peer.peers.push(id)
            })
        })

    })

    // Time end

    const end = Date.now()
    const d = new Date(end - start)
    console.log(`Time computed ${d.getUTCHours()}h ${d.getUTCMinutes()}m ${d.getUTCSeconds()}s ${d.getUTCMilliseconds()}ms`)

    // Write JSON

    fs.writeFile('./data/authors.json', JSON.stringify(authors, null, '\t'), err => {
        if (err) throw err
    })



}