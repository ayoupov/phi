

type alias SimulationModel =
  { pvPanels: List PVPanel
  , windTurbines: List WindTurbine
  , transmissionLines: List TransmissionLine
  , batteries: List Battery
  , residences: List Residence
  }

type alias KWHour = Int
type alias Latitude = Int
type alias Longitude = Int

type alias PVPanel =
  { maxGeneration: KWHour
  , generatedEnergy: KWHour
  , lat: Latitude
  , long: Longitude
  }

type alias WindTurbine =
  { maxGeneration: KWHour
  , generatedEnergy: KWHour
  , lat: Latitude
  , long: Longitude
  }

type alias Battery =
  { capacity: KWHour
  , storage: KWHour
  , lat: Latitude
  , long: Longitude
  }

type alias Residence =
  { dailyConsumption: KWHour
  , lat: Latitude
  , long: Longitude
  }

type Node = NodePV PVPanel
          | NodeWT WindTurbine
          | NodeR Residence
          | NodeB Battery

type alias TransmissionLine =
  { nodeA: Node
  , nodeB: Node
  }

initD : String -> (SimulationModel, Cmd Msg)
initD topic =
  ( SimulationModel
      []
      []
      []
      []
      []
  , Cmd.none
  )

