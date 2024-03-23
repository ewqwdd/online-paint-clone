export const classnames = (cls: string | undefined, cnd?: Record<string, boolean>, other?: string[]) => [
    cls ?? '',
    ...Object.entries(cnd || {}).filter(([, val]) => val).map(elem => elem[0]),
    ...(other ?? [])
].join(' ')