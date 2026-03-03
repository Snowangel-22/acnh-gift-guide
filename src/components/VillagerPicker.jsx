import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import VillagerCard from './VillagerCard'
import MultiSelectFilter from './MultiSelectFilter'

function VillagerPicker({ villagers, pinnedNames, onTogglePin, inventoryItems }) {
  const [search, setSearch] = useState('')
  const [selectedPersonalities, setSelectedPersonalities] = useState([])
  const [selectedSpecies, setSelectedSpecies] = useState([])

  const personalities = useMemo(() =>
    [...new Set(villagers.map(v => v.personality))].sort(), [villagers])

  const species = useMemo(() =>
    [...new Set(villagers.map(v => v.species))].sort(), [villagers])

  const fuse = useMemo(() => new Fuse(villagers, {
    keys: ['name', 'species', 'personality'],
    threshold: 0.3,
  }), [villagers])

  const filtered = useMemo(() => {
    let results = search.trim() ? fuse.search(search).map(r => r.item) : villagers
    if (selectedPersonalities.length) results = results.filter(v => selectedPersonalities.includes(v.personality))
    if (selectedSpecies.length) results = results.filter(v => selectedSpecies.includes(v.species))
    return [...results].sort((a, b) => {
      const aPinned = pinnedNames.includes(a.name)
      const bPinned = pinnedNames.includes(b.name)
      if (aPinned && !bPinned) return -1
      if (!aPinned && bPinned) return 1
      return 0
    })
  }, [search, selectedPersonalities, selectedSpecies, fuse, villagers, pinnedNames])

  const hasFilters = search || selectedPersonalities.length || selectedSpecies.length
  const clearAll = () => {
    setSearch('')
    setSelectedPersonalities([])
    setSelectedSpecies([])
  }

  return (
    <div>
      <p className="pin-count">{pinnedNames.length} / 10 villagers pinned</p>
      <input
        className="search-input"
        type="text"
        placeholder="Search by name, species, personality..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="filter-bar">
        <MultiSelectFilter
          label="Personality"
          options={personalities}
          selected={selectedPersonalities}
          onChange={setSelectedPersonalities}
        />
        <MultiSelectFilter
          label="Species"
          options={species}
          selected={selectedSpecies}
          onChange={setSelectedSpecies}
        />
        {hasFilters && (
          <button className="clear-filters-btn" onClick={clearAll}>Clear</button>
        )}
      </div>
      {villagers.length === 0 ? (
        <p className="empty-state">
          Villager data not loaded yet.<br />
          See setup instructions to populate villagers.json.
        </p>
      ) : filtered.length === 0 ? (
        <p className="empty-state">No villagers match your filters</p>
      ) : (
        filtered.map(villager => (
          <VillagerCard
            key={villager.name}
            villager={villager}
            isPinned={pinnedNames.includes(villager.name)}
            onToggle={() => onTogglePin(villager.name)}
            inventoryItems={inventoryItems}
          />
        ))
      )}
    </div>
  )
}

export default VillagerPicker
