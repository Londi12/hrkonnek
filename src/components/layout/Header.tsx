import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

interface HeaderProps {
  user: any;
  setUser: (user: any) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header({ user, setUser }: HeaderProps) {
  const navigation = user 
    ? user.role === 'admin'
      ? [
          { name: 'Dashboard', href: '/admin', current: location.pathname === '/admin' },
          { name: 'Candidates', href: '/admin/candidates', current: location.pathname.includes('/admin/candidates') },
        ]
      : [
          { name: 'Profile', href: '/profile', current: location.pathname === '/profile' },
          { name: 'Upload CV', href: '/upload-cv', current: location.pathname === '/upload-cv' },
          { name: 'Documents', href: '/upload-documents', current: location.pathname === '/upload-documents' },
        ]
    : []

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="text-xl font-bold text-gray-800">
                    NWI CV Manager
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'border-primary-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {user ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                          {user.email[0].toUpperCase()}
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block w-full px-4 py-2 text-left text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="space-x-4">
                    <Link
                      to="/login"
                      className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="bg-primary-600 text-white hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700',
                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {user ? (
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="px-4">
                  <div className="text-base font-medium text-gray-800">{user.email}</div>
                  <div className="text-sm font-medium text-gray-500">{user.role}</div>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="button"
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="space-y-1">
                  <Disclosure.Button
                    as={Link}
                    to="/login"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign in
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/register"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign up
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
