export default function formatCurrency(value: number | bigint) {
    
    const formatCurrency = 
      new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value)
    
    return (
        formatCurrency
    )
}