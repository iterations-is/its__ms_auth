export interface MessageDTO {
	// Unique identifier for the event (MS independent)
	code?: string;
	// Description
	message?: string;
	// Useful data
	payload?: any;
}
