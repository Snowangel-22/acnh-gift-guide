import { useState } from 'react'
import ClothingItem from './ClothingItem'

function Inventory({ catalog, inventory, onAddItem, onRemoveItem }) {
  const [search, setSearch] = useState('')

  const filtered = catalog.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <p className="pin-count">{inventory.length} item{inventory.length !== 1 ? 's' : ''} in inventory</p>
      <input
        className="search-input"
        type="text"
        placeholder="Search clothing..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {catalog.length === 0 ? (
        <p className="empty-state">
          Clothing data not loaded yet.<br />
          See setup instructions to populate clothing.json.
        </p>
      ) : filtered.length === 0 ? (
        <p className="empty-state">No items match "{search}"</p>
      ) : (
        filtered.map(item => (
          <ClothingItem
            key={item.name}
            item={item}
            isInInventory={inventory.includes(item.name)}
            onAdd={() => onAddItem(item.name)}
            onRemove={() => onRemoveItem(item.name)}
          />
        ))
      )}
    </div>
  )
}

export default Inventory
