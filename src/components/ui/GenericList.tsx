

type GenericListProps<T> = {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T) => React.ReactNode;
};

export default function GenericList<T>({getKey, items,renderItem}:GenericListProps<T>) {
    if (!items || items.length === 0) return <div>No hay datos</div>
  
    return (
        <>
            {
                items.map(item => (
                    <div key={getKey(item)}>
                        {renderItem(item)}
                    </div>
                ))
            }
        </>
    )
}
