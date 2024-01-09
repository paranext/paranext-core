# Platform.Bible React hooks

This folder contains React hooks for Platform.Bible. In these hooks, we abide by the following design guidelines:

- **Refresh value when changing access key**: Make key/selector changes retrieve the value at the new key/selector instead of overwriting the existing value at the new key/selector.
- **Repeat existing patterns**: Use existing hook patterns where reasonable. Especially consider modeling new hooks after built-in React hooks.
- **Simple interfaces**: Generally aim for simple, easy-to-understand interfaces where reasonable.
- **Minimize re-renders**: Avoid bloating the hook with many extra renders where reasonable. Try to minimize state and effects created and used.
- **Use stable parameters - avoid `deps`**: Whenever reasonable, avoid accepting a `deps` dependency array parameter to pass into `useEffect`, `useCallback`, etc. Instead, use a [stable parameter](#stable-parameters). Doing so avoids having to manage dependencies that we know nothing about and instead puts that responsibility on the user of the hook.
  - **Warn on stable parameters**: Always add a warning to any parameter that is part of a hook's dependency array that [the parameter must be stable](#documenting-stable-parameters).
- **Use `ref` parameters**: Make as many parameters as you can, especially `defaultValue` and `options` parameters, [`ref` parameters](#ref-parameters).
  - **Note on `ref` parameters**: Always include [the note that must accompany all `ref` parameters](#documenting-ref-parameters).

Read some implemented examples of our hook design guidelines [here](https://github.com/paranext/paranext-core/issues/552).

## `ref` parameters

We call parameters that are assigned to a `useRef` and are kept up-to-date "`ref` parameters". These parameters do not need to be included in dependency arrays. Therefore, they will not cause likely unintended recalculations of dependency-based hooks like `useEffect` and `useCallback` if someone forgets to make the parameter a [stable reference](#stable-parameters). Using refs for these allows callbacks and other things that can re-initiate a need for a `defaultValue` to honor the most current value of these parameters, but some things may not be kept up-to-date with the latest value of these `ref` parameters depending on how they are used in the hook. In some cases, not causing recalculations of dependency-based hooks is simply to be expected from these parameters (for example, `defaultValue` in `useState` does not need to be a stable reference as it is only used once. We can think of these `ref` parameters as similiar to this `defaultValue`). However, in other cases, it is not naturally expected but may still be a benefit.

### Deciding what should be a `ref` parameter

If not recalculating dependency-based hooks appears to be beneficial to the hook's overall functionality and ease of use, it is appropriate to use a `ref` parameter. Otherwise, a `ref` parameter may not be the best choice.

For example:

- Effective `ref` parameter: `options` in `useDialogCallback` is a `ref` parameter because there are no situations where action must be taken based on a change in `options`; the latest value of `options` can be used anytime throughout the hook without needing to keep track of changes.
- Overall beneficial but not so clear-cut `ref` parameter: `subscriberOptions` in `useData` is a `ref` parameter. This means that, unfortunately, the `subscriberOptions` will be passed into the data provider subscriber immediately and will not change unless another parameter changes even if `subscriberOptions` received in the hook changes. However, the high likelihood that someone would forget to make this a stable reference and the very significant consequences of forgetting to do so (constantly sending requests to the target data provider) warrant accepting the consequences of making this a `ref` parameter.
- Ineffective `ref` parameter: `selector` in `useData` is NOT a `ref` parameter. Although forgetting to make this a stable reference may be somewhat likely and the consequences of doing so would be very significant (constantly sending requests to the target data provider), the extremely high likelihood that someone would want to change this value frequently warrants keeping `selector` a [stable parameter](#stable-parameters).

### Documenting `ref` parameters

For every `ref` parameter we create in a hook, we should document accordingly. The JSDoc for each `ref` parameter should have a new paragraph under it with "Note: this parameter is internally assigned to a ref, so changing it will not cause any hooks to re-run with its new value." along with an explanation of the implications of using a ref for this parameter specifically in each context. Indicate very clearly in the JSDoc that these parameters are NOT listened to in dependency arrays; if another argument must be changed or the component must be remounted in order for the parameter's latest value to be used, explain that this is the case.

## Stable parameters

We call parameters that are listed in dependency arrays of internal hooks like `useEffect` "stable parameters". If the hook receives a new value for this parameter on a subsequent render, some effects may occur including returning new references (which may cause additional subsequent renders depending on how the user is using the hook) or side effect calculations (which may internally trigger additional subsequent renders) based on the parameter. As such, it may be very important for the user to pass a reference that only changes when necessary to the hook. That way, the user can avoid unnecessary effects.

An example of a stable parameter is `promiseFactoryCallback` in `usePromise`. This parameter is a function that would receive a new reference every render and cause the callback to be run every render if the hook user does not wrap the function in `useCallback`. However, we do not want to accept a `deps` parameter to pass into an internal `useCallback` to manage the function reference for the user because we know much less about the function and its necessary dependencies than the user does. We will trust the user is able to make effective decisions for the hook and will pass us a reference that only changes when appropriate. Additionally, there may be in some cases a need for multiple different dependency arrays to be passed into one hook if we managed references for our users. This would create a complex and difficult-to-understand interface for the user.

### Documenting stable parameters

For every parameter we require to be stable in a hook, we should document accordingly. The JSDoc for each stable parameter should have a new paragraph under it with "WARNING: MUST BE STABLE - `<relevant_information>`. The reference must not be updated every render" with information about what may be used in place of `<relevant_information>`.

For example, the warning on `promiseFactoryCallback` in `usePromise` explains ways to make the **function parameter** stable:

> WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated every render

For another example, the warning on `selector` in `useData` explains ways to make the **object parameter** stable:

> WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be updated every render
