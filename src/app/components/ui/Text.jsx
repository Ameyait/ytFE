'use client'

import clsx from 'clsx'

export default function Text({
  as = 'p',        // p | span | h1 | h2 | h3 | h4 | h5 | h6
  variant = 'body',
  className,
  children,
  ...props
}) {
  const Component = as

  const variants = {

    h1: 'text-5xl text-primary font-semibold leading-tight mb-2',
    h2: 'text-heading text-3xl lg:text-4xl font-normal',
    h3: 'text-sm font-semibold text-paragraph sm:text-[15px] leading-snug',
    h4: 'text-sm mb-4 font-semibold uppercase text-gray-500',
    h5: 'text-base  text-text-red',
    h6: 'text-lg  font-semibold text-paragraph',

    /* New Added */
    p: 'text-xs leading-7 text-paragraph',
    span: 'text-base text-paragraph',

    body: 'text-sm text-paragraph',
    muted: 'text-xs text-gray-500',
    label: 'text-xs font-medium text-gray-600',
  }

  return (
    <Component
      className={clsx(
        variants[variant] || variants[as] || variants.body,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}