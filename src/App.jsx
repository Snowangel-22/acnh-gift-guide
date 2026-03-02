import { useState, useMemo } from 'react'
import villagers from './data/villagers.json'
import clothing from './data/clothing.json'
import { useLocalStorage } from './hooks/useLocalStorage'
import VillagerPicker from './components/VillagerPicker'
import Inventory from './components/Inventory'
import GiftMatching from './components/GiftMatching'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('villagers')
  const [pinnedNames, setPinnedNames] = useLocalStorage('acnh-pinned', [])
  const [inventory, setInventory] = useLocalStorage('acnh-inventory', [])

  const handleTogglePin = (name) => {
    if (pinnedNames.includes(name)) {
      setPinnedNames(pinnedNames.filter(n => n !== name))
    } else if (pinnedNames.length < 10) {
      setPinnedNames([...pinnedNames, name])
    }
  }

  const handleAddItem = (name) => {
    if (!inventory.includes(name)) {
      setInventory([...inventory, name])
    }
  }

  const handleRemoveItem = (name) => {
    setInventory(inventory.filter(n => n !== name))
  }

  const pinnedVillagers = useMemo(
    () => pinnedNames.map(n => villagers.find(v => v.name === n)).filter(Boolean),
    [pinnedNames]
  )

  const inventoryItems = useMemo(
    () => inventory.map(n => clothing.find(c => c.name === n)).filter(Boolean),
    [inventory]
  )

  const matchesByVillager = useMemo(
    () => pinnedVillagers.map(villager => ({
      villager,
      matchedItems: inventoryItems.filter(item =>
        villager.favorite_styles.includes(item.style)
      )
    })),
    [pinnedVillagers, inventoryItems]
  )

  return (
    <div className="app">
      <nav className="tab-bar">
        <button
          className={activeTab === 'villagers' ? 'active' : ''}
          onClick={() => setActiveTab('villagers')}
        >
          Villagers
        </button>
        <button
          className={activeTab === 'inventory' ? 'active' : ''}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
        <button
          className={activeTab === 'matching' ? 'active' : ''}
          onClick={() => setActiveTab('matching')}
        >
          Gift Matching
        </button>
      </nav>

      <div className="tab-content">
        {activeTab === 'villagers' && (
          <VillagerPicker
            villagers={villagers}
            pinnedNames={pinnedNames}
            onTogglePin={handleTogglePin}
          />
        )}
        {activeTab === 'inventory' && (
          <Inventory
            catalog={clothing}
            inventory={inventory}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
          />
        )}
        {activeTab === 'matching' && (
          <GiftMatching matchesByVillager={matchesByVillager} />
        )}
      </div>

      <footer className="footer">
        Data sourced from{' '}
        <a href="https://acnh.co/villagers" target="_blank" rel="noreferrer">acnh.co</a>
        {' '}and{' '}
        <a href="https://nookipedia.com/wiki/Clothing/New_Horizons/All_clothing" target="_blank" rel="noreferrer">Nookipedia</a>.
        Not affiliated with Nintendo.
      </footer>
    </div>
  )
}

export default App
