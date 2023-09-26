const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js');

const users = [
    { id: "1", username: "First", age: 33 },
    { id: "2", username: "Second" }
]

const app = express()

const createUs = (input) => {
    const id = Date.now();
    return {
        id, ...input
    }
}

const root = {
    getAllUsers: () => {
        return users;
    },
    getUser: ({ id }) => {
        return users.find(user => user.id === id);
    },

    createUser: ({ input }) => {
        const user = createUs(input);//funk line - 13
        users.push(user);
        return user;
    }
}

app.use(cors());
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

app.listen(5000, () => console.log("Server was start"));