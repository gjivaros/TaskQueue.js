import { TaskQueue } from "./TaskQueue";

describe("TaskQueue", () => {
	describe("push method", () => {
		const taskQueue = new TaskQueue();
		it("should not task in new instance of queue", () => {
			expect(taskQueue.getSize()).toBe(0);
		});

		it("should push task in queue", () => {
			taskQueue.push(() => console.log("Task 1"));
			expect(taskQueue.getSize()).toBe(1);
		});
	});
});
