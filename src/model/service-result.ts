export class ServiceResult<T, K = number> {
    constructor(
        public result: boolean,
        public value: T,
        public error: K,
    ) {}
}