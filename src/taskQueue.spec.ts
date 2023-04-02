import { TaskQueue } from "./taskQueue";

describe("TaskQueue", () => {
	describe("push method", () => {
		const taskQueue = new TaskQueue();
		it("should not task in new instance of queue", () => {
			expect(taskQueue.size()).toBe(0);
		});

		it("should push task in queue", () => {
			taskQueue.push(async () => console.log("Task1"));
			taskQueue.push(async () => console.log("Task3"));
			taskQueue.push(async () => console.log("Task2"));
			expect(taskQueue.size()).toBe(3);
		});

		it("should run task", async () => {
			await taskQueue.run();
			expect(taskQueue.size()).toBe(0);
		});

		it("should get task by taskId", () => {
			const taskId = taskQueue.push(async () => console.log("Hello"));
			const task = taskQueue.getTask(taskId);
			expect(task.id).toBe(taskId);
		});
	});
});
