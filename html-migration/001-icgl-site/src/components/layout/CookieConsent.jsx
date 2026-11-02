import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, Settings2, X } from 'lucide-react'

const STORAGE_KEY = 'icgl-cookie-preferences-v1'
const DEFAULT_PREFERENCES = {
  necessary: true,
  analytics: false,
  marketing: false,
}

function readPreferences() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const preferences = JSON.parse(stored)
    if (
      typeof preferences?.necessary !== 'boolean' ||
      typeof preferences?.analytics !== 'boolean' ||
      typeof preferences?.marketing !== 'boolean' ||
      preferences.necessary !== true
    ) {
      return null
    }
    return preferences
  } catch (error) {
    console.error('Unable to read cookie preferences from local storage.', error)
    return null
  }
}

export default function CookieConsent() {
  const [preferences, setPreferences] = useState(readPreferences)
  const [draft, setDraft] = useState(preferences ?? DEFAULT_PREFERENCES)
  const [showPreferences, setShowPreferences] = useState(false)
  const [storageError, setStorageError] = useState(false)

  function savePreferences(nextPreferences) {
    let saved = false
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPreferences))
      setStorageError(false)
      saved = true
    } catch (error) {
      console.error('Unable to save cookie preferences to local storage.', error)
      setStorageError(true)
      setShowPreferences(true)
    }
    setPreferences(nextPreferences)
    setDraft(nextPreferences)
    if (saved) setShowPreferences(false)
  }

  function openPreferences() {
    setDraft(preferences ?? DEFAULT_PREFERENCES)
    setShowPreferences(true)
  }

  if (preferences && !showPreferences) {
    return (
      <button
        type="button"
        onClick={openPreferences}
        className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-lg transition hover:border-lime-dark hover:bg-lime-light"
        aria-label="Open cookie preferences"
      >
        <Settings2 size={16} />
        Cookie settings
      </button>
    )
  }

  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-white/95 shadow-[0_-12px_40px_rgba(0,0,0,0.16)] backdrop-blur-md"
      aria-labelledby="cookie-consent-title"
    >
      <div className="mx-auto max-h-[85vh] max-w-7xl overflow-y-auto px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
        <div className="flex items-start gap-4">
          <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-light text-lime-dark sm:flex">
            <Cookie size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="cookie-consent-title" className="font-display text-xl font-medium text-ink">
                  Your cookie preferences
                </h2>
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-ink-soft">
                  Choose whether to allow optional cookies. Necessary storage is always enabled
                  to remember your choice. You can update your preferences at any time.
                  {' '}
                  <Link
                    to="/resources/privacy-policy"
                    className="font-medium text-ink underline underline-offset-2 hover:text-lime-dark"
                  >
                    Read our Privacy Policy
                  </Link>
                </p>
              </div>
              {preferences && (
                <button
                  type="button"
                  onClick={() => setShowPreferences(false)}
                  className="rounded-full p-2 text-ink-soft transition hover:bg-ink/5 hover:text-ink"
                  aria-label="Close cookie preferences"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {storageError && (
              <p className="mt-3 text-sm text-red-700" role="status">
                Your preference is active for this visit, but this browser could not save it.
                You may be asked again next time.
              </p>
            )}

            {showPreferences && (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-ink/10 p-4">
                  <p className="text-sm font-semibold text-ink">Necessary</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                    Required to store and apply your cookie choice.
                  </p>
                  <span className="mt-3 inline-block text-xs font-semibold text-lime-dark">
                    Always on
                  </span>
                </div>
                {[
                  ['analytics', 'Analytics', 'Helps understand how visitors use the website.'],
                  ['marketing', 'Marketing', 'Allows relevant communications and content.'],
                ].map(([key, label, description]) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-ink/10 p-4"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-ink">{label}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-ink-soft">
                        {description}
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      checked={draft[key]}
                      onChange={(event) =>
                        setDraft((current) => ({ ...current, [key]: event.target.checked }))
                      }
                      className="mt-1 h-4 w-4 shrink-0 accent-lime-dark"
                    />
                  </label>
                ))}
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-2.5">
              {showPreferences ? (
                <>
                  <button
                    type="button"
                    onClick={() => savePreferences(draft)}
                    className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-lime-dark"
                  >
                    Save preferences
                  </button>
                  <button
                    type="button"
                    onClick={() => savePreferences(DEFAULT_PREFERENCES)}
                    className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-ink/5"
                  >
                    Reject optional
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      savePreferences({ necessary: true, analytics: true, marketing: true })
                    }
                    className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-lime-dark"
                  >
                    Accept all
                  </button>
                  <button
                    type="button"
                    onClick={() => savePreferences(DEFAULT_PREFERENCES)}
                    className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-ink/5"
                  >
                    Reject optional
                  </button>
                  <button
                    type="button"
                    onClick={openPreferences}
                    className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-ink/5"
                  >
                    Customize
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
