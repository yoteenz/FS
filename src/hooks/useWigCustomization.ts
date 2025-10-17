import { useState, useEffect } from 'react'
import { wigApi, WigCustomization, WigOption } from '../lib/supabase'

export const useWigCustomization = () => {
  const [customization, setCustomization] = useState<WigCustomization>({
    cap_size: 'M',
    length: '24"',
    density: '200%',
    lace: '13X6',
    texture: 'SILKY',
    color: 'OFF BLACK',
    hairline: 'NATURAL',
    styling: 'NONE',
    add_ons: [],
    base_price: 860,
    total_price: 860
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Calculate total price based on customization
  const calculateTotalPrice = (customization: WigCustomization): number => {
    let total = customization.base_price

    // Add pricing logic based on selections
    // This should match your pricing structure
    if (customization.length !== '24"') {
      // Add length pricing logic
      const lengthPrices: { [key: string]: number } = {
        '16"': -50,
        '18"': -25,
        '20"': -10,
        '22"': -5,
        '24"': 0,
        '26"': 50,
        '28"': 100,
        '30"': 150,
        '32"': 200,
        '34"': 250,
        '36"': 300,
        '40"': 400
      }
      total += lengthPrices[customization.length] || 0
    }

    // Add other pricing logic as needed
    return total
  }

  // Update customization
  const updateCustomization = (updates: Partial<WigCustomization>) => {
    const newCustomization = { ...customization, ...updates }
    const totalPrice = calculateTotalPrice(newCustomization)
    setCustomization({ ...newCustomization, total_price: totalPrice })
  }

  // Save customization to Supabase
  const saveCustomization = async (): Promise<boolean> => {
    setLoading(true)
    setError(null)

    try {
      const result = await wigApi.saveCustomization(customization)
      if (result) {
        setCustomization({ ...customization, id: result.id })
        return true
      }
      return false
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save customization')
      return false
    } finally {
      setLoading(false)
    }
  }

  // Load saved customizations
  const loadCustomizations = async (): Promise<WigCustomization[]> => {
    setLoading(true)
    setError(null)

    try {
      const customizations = await wigApi.getCustomizations()
      return customizations
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load customizations')
      return []
    } finally {
      setLoading(false)
    }
  }

  return {
    customization,
    loading,
    error,
    updateCustomization,
    saveCustomization,
    loadCustomizations,
    calculateTotalPrice
  }
}

export const useWigOptions = (category: string) => {
  const [options, setOptions] = useState<WigOption[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true)
      setError(null)

      try {
        const fetchedOptions = await wigApi.getWigOptions(category)
        setOptions(fetchedOptions)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load options')
      } finally {
        setLoading(false)
      }
    }

    if (category) {
      loadOptions()
    }
  }, [category])

  return { options, loading, error }
}
