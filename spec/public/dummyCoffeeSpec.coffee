describe "a dummy test in coffeescript", ->
  it "verifies a simple expression", ->
    expect(1+1).toEqual(2)


describe "using given syntax", ->
  Then -> expect(1+1).toEqual(2)