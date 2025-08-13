describe('Example Test', () => {
  it('should pass a basic test', () => {
    expect(true).toBe(true)
  })

  it('should handle basic math', () => {
    expect(2 + 2).toBe(4)
  })

  it('should handle string operations', () => {
    const message = 'Hello World'
    expect(message).toContain('Hello')
    expect(message.length).toBe(11)
  })
})
