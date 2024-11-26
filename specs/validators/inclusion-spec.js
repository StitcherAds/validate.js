describe("validators.inclusion", function() {
  const inclusion = validate.validators.inclusion.bind(validate.validators.inclusion)
  const within = ["foo", "bar", "baz"]

  afterEach(function() {
    delete validate.validators.inclusion.message
    delete validate.validators.inclusion.options
  })

  it("allows empty values", function() {
    expect(inclusion(null, {})).toBeUndefined()
    expect(inclusion(undefined, {})).toBeUndefined()
  })

  it("returns an error if the value is not included", function() {
    const opts = { within }
    expect(inclusion("quux", opts)).toEqual("^quux is not included in the list")
    expect(inclusion(false, opts)).toEqual("^false is not included in the list")
    expect(inclusion(1, opts)).toEqual("^1 is not included in the list")
  })

  it("allows you to customize the message", function() {
    validate.validators.inclusion.message = "^Default message: %{value}"
    const opts = { within }
    expect(inclusion("quux", opts)).toEqual("^Default message: quux")

    opts.message = "^%{value} is not a valid choice"
    expect(inclusion("quux", opts)).toEqual("^quux is not a valid choice")
  })

  it("supports default options", function() {
    validate.validators.inclusion.options = {
      message: "barfoo",
      within: [1, 2, 3]
    }
    const options = { message: 'foobar' }
    expect(inclusion(4, options)).toEqual('foobar')
    expect(inclusion(4, {})).toEqual('barfoo')
  })

  it("allows functions as messages", function() {
    const message = function() { return "foo" }
    const options = { message, within: ["bar"] }
    const value = "foo"
    expect(inclusion(value, options)).toBe(message)
  })
})