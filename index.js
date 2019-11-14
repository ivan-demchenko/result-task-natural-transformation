const Result = require('folktale/result');
const Task = require('folktale/concurrency/task');

const validateEmail = (email) =>
    email.indexOf('@') > -1 ? Result.Ok(`Your email ${email} is valid`)
                            : Result.Error('Bad email');

const resultToTask = (result) =>
    result.matchWith({
        Ok:    ({ value }) => Task.of(value),
        Error: ({ value }) => Task.rejected(value)
    });

resultToTask(validateEmail('test@ema.il'))
.run().promise().then(console.log)
