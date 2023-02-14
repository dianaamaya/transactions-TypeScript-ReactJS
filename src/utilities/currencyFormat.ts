const plnCurrency = (value: number): string => {
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(value)
}

export { plnCurrency }