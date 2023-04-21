exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'CHAR(36)',
      primaryKey: true,
      notNull: true
    },
    full_name: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    username: {
      type: 'VARCHAR(255)',
      unique: true,
      notNull: true
    },
    password: {
      type: 'VARCHAR(255)',
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

exports.down = (pgm) => pgm.dropTable('users')
