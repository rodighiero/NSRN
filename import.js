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

    records = records.reduce((records, record) => {

        console.log('reading')

        // Add

        records.push(record)
        return records

    }, [])

    return

    // Grouping by author

    const authors = records
        // .slice(0, 100) // Trim for testing
        .reduce((authors, record, i) => {

            if ((i % 1000) === 0) console.log('Grouping record #', records.length - i)

            const year = parseInt(record.publish_time.split('-')[0])
            const text = `${record.title} ${record.abstract} `

            const update = author => {
                author.docs++
                author.text += text
                if (author.years[year]) (author.years[year])++
                else (author.years[year]) = 1
            }

            const add = name => {
                authors.push({
                    name: name,
                    docs: 1,
                    years: {
                        [year]: 1
                    },
                    peers: [],
                    variants: [],
                    text: text
                })
            }

            record.authors.forEach(name => {

                // Update same
                const same = authors.find(a => a.name === name)
                if (same) {
                    update(same)
                    return
                }

                // Update similar
                const similar = authors.find(a => dice(a.name, name) > .9)
                if (similar) {
                    if (!similar.variants.includes(similar.name)) similar.variants.push(similar.name)
                    update(similar)
                    return
                }

                // Create new
                add(name)

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

            if (record.authors.includes(author.name)) flag = true

            author.variants.forEach(variant => {
                if (record.authors.includes(variant)) {
                    flag = true
                }
            })

            return flag
        })

        // console.log(peers)

        const ids = peers.map(author => author.id)

        peers.forEach(peer => {
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