import {h32} from "xxhashjs";

export const hashFunction = object => {
	return h32(
		typeof object === "string" ? object : JSON.stringify(object),
		0xabcd
	).toString(16);
};