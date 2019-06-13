class Animal
  def name(name)
    @name = name
    self
    # TODO: what should this method return?
  end

  def species(species)
    @species = species
    self
    # TODO: what should this method return?
  end

  def color(color)
    @color = color
    self
    # TODO: what should this method return?
  end

  def natural_habitat(natural_habitat)
    @natural_habitat = natural_habitat
    self
    # TODO: what should this method return?
  end

  def to_s
    "Name: #{@name}, Species: #{@species}, Color: #{@color}, Natural Habitat: #{@natural_habitat}"
  end
end
