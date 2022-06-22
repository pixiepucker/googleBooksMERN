// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type User {
    -id: ID
    username: String
    email: String
    bookCount: Int,
    savedBooks: [Book]
  }

  input savedBook {
    authors: [String]!
    description: String!
    title: String!
    _id: ID!
    image: String!
    link: String!
  }

  type Query {
    me: User
    books: [Book]
  }

  type Mutation {
    login(email: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!): User
    saveBook(input: savedBook): User
    removeBook(_id: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
