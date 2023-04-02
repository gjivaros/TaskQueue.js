export type Task = (...args: any[]) => Promise<unknown>;

export interface QueuedTask {
	task: Task;
	args: any[];
	retryCount: number;
}
