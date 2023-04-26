exports.up = (pgm) =>
  pgm.addColumn('notes', {
    owner: {
      type: 'VARCHAR(255)'
    }
  })

exports.down = (pgm) => pgm.dropColumn('notes', 'owner')
