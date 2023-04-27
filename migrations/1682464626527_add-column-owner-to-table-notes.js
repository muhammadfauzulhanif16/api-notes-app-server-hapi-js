exports.up = (pgm) =>
  pgm.addColumn('notes', {
    owner: {
      type: 'CHAR(36)'
    }
  })

exports.down = (pgm) => pgm.dropColumn('notes', 'owner')
