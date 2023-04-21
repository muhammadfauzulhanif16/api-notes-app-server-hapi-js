exports.up = (pgm) => {
  pgm.createTable('notes', {
    id: {
      type: 'CHAR(36)',
      primaryKey: true,
      notNull: true
    },
    title: {
      type: 'TEXT',
      notNull: true
    },
    body: {
      type: 'TEXT',
      notNull: true
    },
    tags: {
      type: 'TEXT[]',
      notNull: true
    },
    created_at: {
      type: 'TIMESTAMPTZ',
      notNull: true
    },
    updated_at: {
      type: 'TIMESTAMPTZ',
      notNull: true
    }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('notes')
}
