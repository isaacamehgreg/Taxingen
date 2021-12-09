export class SuccessResponse {
	status: string;
	message: string;
	data: any;
	constructor(message = 'Successfully', data?: any) {
		this.status = 'success';
		this.message = message;
		this.data = data;
	}
}
