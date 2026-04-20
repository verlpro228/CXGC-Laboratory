export const getH5HomeUrl = () => {
  const { protocol, hostname, port, origin, pathname } = window.location
  const isLocal = ['localhost', '127.0.0.1'].includes(hostname)
  const isNestedAdmin = pathname.startsWith('/admin')

  if (isLocal && port && port !== '3000' && !isNestedAdmin) {
    return `${protocol}//${hostname}:3000/`
  }

  return `${origin}/`
}

export const goToH5Home = () => {
  window.location.href = getH5HomeUrl()
}
