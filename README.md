# TaskQueue.js
> TaskQueue.js is a JavaScript task queue management library for client and server side development.


## Table of Contents
* [Installation](#installation)
* [Use](#use)
* [Contribute](#contribute)
* [License](#license)
* [Contact](#contact)


## Installation
You can install TaskQueue.js using npm :
```sh
npm install taskqueue.js
```


## Use
To use TaskQueue.js, you just need to import the library and create an instance of the task queue :
```ts
import TaskQueue from "taskqueue.js";

const taskQueue = new TaskQueue();
```
You can then add tasks to the queue:
```ts
taskQueue.push(() => console.log("Task1");
taskQueue.push(() => console.log("Task2");

// Add a task with arguments
taskQueue.push((arg1:string, arg2:string) => console.log(arg1,arg2), arg1, arg2);
```
You can run the tasks in sequence using the `run()` method:
```ts
await taskQueue.run()
```

TaskQueue.js also handles errors and automatic task repetition in case of failure.

## Contribute
Contributions to TaskQueue.js are welcome! To contribute, please fork this repository, make your changes and submit a pull request.
```sh
cp .vscode/settings.example.json .vscode/settings.json
npm i
```



## License
TaskQueue.js is licensed under the MIT license. See the LICENSE file for more details.


## Contact
Created by Jivaros GBETO - [Twitter](https://twitter.com/JivarosG) | [LinkedIn](https://www.linkedin.com/in/jivaros-gbeto/) | jivarosgbeto@gmail.com - feel free to contact me!
