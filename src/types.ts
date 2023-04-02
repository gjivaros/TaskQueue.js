export type Task = (...args: any[]) => Promise<unknown>;

export interface QueuedTask {
	id: string;
	task: Task;
	args: any[];
	retryCount: number;
	status: "pending" | "success" | "error";
	failedReason?: any;
}
