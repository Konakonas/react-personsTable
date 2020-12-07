export enum status {
	client = "client",
	partner = "partner",
	admin = "admin",
}

export interface IPerson {
	id: number,
	email: string,
	password: string,
	status: status,
	name: string,
	phone: string,
	dateCreated: Date,
	dateChanged: Date,
}


