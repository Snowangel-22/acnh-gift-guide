import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import ClothingItem from './ClothingItem'
import MultiSelectFilter from './MultiSelectFilter'

function getItemSources(item) {
  return item.source.split('\n').map(s => s.trim()).filter(Boolean)
}

function Inventory({ catalog, inventory, onAddItem, onRemoveItem }) {
  const [search, setSearch] = useState('')
  const [selectedStyles, setSelectedStyles] = useState([])
  const [selectedSources, setSelectedSources] = useState([])

  const styles = useMemo(() =>
    [...new Set(catalog.map(item => item.style))].sort(), [catalog])

  const sources = useMemo(() =>
    [...new Set(catalog.flatMap(item => getItemSources(item)))].sort(), [catalog])

  const fuse = useMemo(() => new Fuse(catalog, {
    keys: ['name', 'style', 'source'],
    threshold: 0.3,
  }), [catalog])

  const filtered = useMemo(() => {
    let results = search.trim() ? fuse.search(search).map(r => r.item) : catalog
    if (selectedStyles.length) results = results.filter(item => selectedStyles.includes(item.style))
    if (selectedSources.length) results = results.filter(item =>
      getItemSources(item).some(s => selectedSources.includes(s))
    )
    return results
  }, [search, selectedStyles, selectedSources, fuse, catalog])

  const inventoryItems = useMemo(() =>
    inventory.map(name => catalog.find(item => item.name === name)).filter(Boolean),
    [inventory, catalog])

  const hasFilters = search || selectedStyles.length || selectedSources.length

  return (
    <div className="inventory-layout">
      <div className="catalog-panel">
        <input
          className="search-input"
          type="text"
          placeholder="Search by name, style, source..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="filter-bar">
          <MultiSelectFilter
            label="Style"
            options={styles}
            selected={selectedStyles}
            onChange={setSelectedStyles}
          />
          <MultiSelectFilter
            label="Source"
            options={sources}
            selected={selectedSources}
            onChange={setSelectedSources}
          />
          {hasFilters && (
            <button className="clear-filters-btn" onClick={() => { setSearch(''); setSelectedStyles([]); setSelectedSources([]) }}>Clear</button>
          )}
        </div>
        {catalog.length === 0 ? (
          <p className="empty-state">Clothing data not loaded yet.</p>
        ) : filtered.length === 0 ? (
          <p className="empty-state">No items match your filters</p>
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

      <div className="inventory-sidebar">
        <p className="sidebar-title">My Inventory ({inventory.length})</p>
        {inventoryItems.length === 0 ? (
          <p className="sidebar-empty">Add items from the catalog</p>
        ) : (
          inventoryItems.map(item => (
            <div key={item.name} className="sidebar-item">
              <div className="sidebar-item-info">
                <span className="sidebar-item-name">{item.name}</span>
                <span className={`badge badge-${item.style.replace(' ', '-')}`}>{item.style}</span>
              </div>
              <button className="sidebar-remove-btn" onClick={() => onRemoveItem(item.name)}>✕</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Inventory
