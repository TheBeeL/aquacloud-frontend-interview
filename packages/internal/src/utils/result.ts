/*
 * A small set of functional utilities
 */

export type ResultSuccess<T> = {
  ok: true;
  data: T;
};

export type ResultFailure<E> = {
  ok: false;
  error: E;
};

/*
 *
 * Functional replacement of a promise
 */
export type Result<T, E> = ResultSuccess<T> | ResultFailure<E>;

/*
 *
 * Functional replacement of a promise
 *
 * Example:
 *
 * const result = await Result.from(() => Promise.resolve(1))
 *
 * if ( Result.isFailure(result) ) {
 *    // handle error
 *    console.error(result.error)
 * }
 *
 * console.log(result.data) // => 1
 */
export const Result = {
  /**
   *
   * `Success` type guard
   */
  isSuccess: <T, E>(p: Result<T, E>): p is ResultSuccess<T> => p.ok,

  /**
   *
   * `Failure` type guard
   */
  isFailure: <T, E>(p: Result<T, E>): p is ResultFailure<E> => !p.ok,
  /**
   *
   * Shorthand to create a `Success` result
   */
  success: <T>(data: T): ResultSuccess<T> => ({ ok: true, data }),
  /**
   *
   * Shorthand to create a `Failure` result
   */
  failure: <E>(error: E): ResultFailure<E> => ({ ok: false, error }),
  /**
   *
   * Build a `PromiseResult` from a `Promise<T>`
   */
  async fromPromise<T, E>(
    lazy: () => Promise<T>,
    onError: (e: unknown) => E
  ): Promise<Result<T, E>> {
    try {
      const data = await lazy();
      return Result.success(data);
    } catch (error) {
      return Result.failure(onError(error));
    }
  },
};
