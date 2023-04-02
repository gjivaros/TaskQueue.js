import { TaskQueue } from "./taskQueue";

describe("TaskQueue", () => {
	describe("push method", () => {
		const taskQueue = new TaskQueue();
		it("should not task in new instance of queue", () => {
			expect(taskQueue.getSize()).toBe(0);
		});

		it("should push task in queue", () => {
			taskQueue.push(async () => console.log("Task1"));
			taskQueue.push(async () => console.log("Task3"));
			taskQueue.push(async () => console.log("Task2"));
			expect(taskQueue.getSize()).toBe(3);
		});

		it("should run task", async () => {
			await taskQueue.run();
			expect(taskQueue.getSize()).toBe(0);
		});
	});
});
