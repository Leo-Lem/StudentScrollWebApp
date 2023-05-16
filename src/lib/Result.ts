type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

export default Result
