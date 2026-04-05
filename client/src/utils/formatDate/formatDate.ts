const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    
    const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const year = date.getFullYear().toString();
    const dayAndMonth = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

    if (year === '2026') {
        return `${dayAndMonth} ${time}`;
    } else {
        return `${dayAndMonth} ${year}г. ${time}`;
    }
}

export default formatDate;
