export const pryColor = '#2bced6'

export const car_years =  [
    { label: "1998", value: "1998" },
    { label: "1999", value: "1999" },
    { label: "2000", value: "2000" },
    { label: "2001", value: "2001" },
    { label: "2002", value: "2002" },
    { label: "2003", value: "2003" },
    { label: "2004", value: "2004" },
    { label: "2005", value: "2005" },
    { label: "2006", value: "2007" },
    { label: "2008", value: "2008" },
    { label: "2009", value: "2009" },
    { label: "2010", value: "2010" },
    { label: "2011", value: "2011" },
    { label: "2012", value: "2012" },
    { label: "2013", value: "2013" },
    { label: "2014", value: "2014" },
    { label: "2015", value: "2015" },
    { label: "2016", value: "2016" },
    { label: "2017", value: "2017" },
    { label: "2018", value: "2018" },
    { label: "2019", value: "2019" },
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
]

export const bodyData = [
    { label: "Saloon", value: "Saloon" },
    { label: "SUV", value: "SUV" },
    { label: "Pick Up", value: "Pick Up" },
]

export const cars = [
    { model: "Toyota", index: '1' },
    { model: "Honda", index: '2' },
    { model: "Mercedes-Benz", index: '3' },
    { model: "Range Rover", index: '4' },
    { model: "Hyundai", index: '5' },
    { model: "Kia", index: '6' },
    { model: "BMW", index: '7' },
    { model: "Lexus", index: '8' },
    { model: "Ford", index: '9' },
    { model: "Mitsubushi", index: '10' },
    { model: "Audi", index: '11' },
    { model: "Volkswagen", index: '12' },
    { model: "Land Rover", index: '13' },
    { model: "Nissan", index: '14' },
    { model: "Jaguar", index: '15' },
  ]

  const findLabourAndVat = (price) =>{
    const labour = price * 0.2
    const vat = (price + labour) * 0.075
    const grandTotal = price + labour + vat

    return { labour, vat, grandTotal }
  }

export const MaintenancePlanData = {
    Basic: {
        cost: 25000,
        price: findLabourAndVat(25000).grandTotal,
        vat: findLabourAndVat(25000).vat,
        labour: findLabourAndVat(25000).labour,
        features: ['Engine oil replacement', 'Oil filter replacement', 'Air filter cleaning', 'Coolant top up', 'Wiper fluid replacement', 'Battery water top up', 'Heater spark plugs checking', 'Car wash', 'Interior vacuuming (Carpets & Seats)']
    },

    Standard: {
        cost: 30000,
        price: findLabourAndVat(30000).grandTotal,
        vat: findLabourAndVat(30000).vat,
        labour: findLabourAndVat(30000).labour,
        features: ['Engine oil replacement', 'Oil filter replacement', 'Air filter cleaning', 'Coolant top up', 'Wiper fluid replacement', 'Battery water top up', 'Heater spark plugs checking', 'Car wash', 'Interior vacuuming (Carpets & Seats)', 'Scanning', 'Rear brake shoes service', 'Front brake pads service', ]
    },

    Comprehensive: {
        cost: 40000,
        price: findLabourAndVat(40000).grandTotal,
        vat: findLabourAndVat(40000).vat,
        labour: findLabourAndVat(40000).labour,
        features: ['Engine oil replacement', 'Oil filter replacement', 'Air filter cleaning', 'Coolant top up', 'Wiper fluid replacement', 'Battery water top up', 'Heater spark plugs checking', 'Car wash', 'Interior vacuuming (Carpets & Seats)', 'Wheel balancing', 'Wheel alignment', 'Tyre rotation', 'Throttle body cleaning', 'gear oil top up']
    }
}

export const InsurancePlanData = {
    ThirdParty: {
        cost: 10000,
        price: findLabourAndVat(10000).grandTotal,
        vat: findLabourAndVat(10000).vat,
        labour: findLabourAndVat(10000).labour,
        features: ['Payment plan - Monthly, quarterly, bi-annual & per annum', 'Premium - Starting from 3% of vehicle value per annum', '3rd party bodily injury', '3rd party property damage (1 million naira limit)','Own accidental damage', 'Excess buy back', 'Theft', 'Fire damage', 'Medical refund (up to 100,000 naira limit)']
    },

    Comprehensive: {
        cost: 16000,
        price: findLabourAndVat(16000).grandTotal,
        vat: findLabourAndVat(16000).vat,
        labour: findLabourAndVat(16000).labour,
        features: ['Payment plan - Per annum only', 'Premium - Starting from 5,000 depending on the type of vehicle', '3rd party bodily injury', '3rd party property damage (1 million naira limit)']
    }
}

export const MembershipPlanData = {
    Gold: {
        cost: 10000,
        price: findLabourAndVat(10000).grandTotal,
        vat: findLabourAndVat(10000).vat,
        labour: findLabourAndVat(10000).labour,
        features: ['Discounts on all requests - 10%', 'Priority response', 'Points and rewards system', 'One free health checkup per year', 'One free detailed cleaning per quarter', 'One free wheel balancing and alignment per year']
    },

    Silver: {
        cost: 6000,
        price: findLabourAndVat(6000).grandTotal,
        vat: findLabourAndVat(6000).vat,
        labour: findLabourAndVat(6000).labour,
        features: ['Discounts on all requests - 5%', 'Priority response', 'Points and rewards system', 'One free health checkup per year']
    }
}

export const HealthPlan = {
    Basic: {
        cost: 5000,
        price: findLabourAndVat(5000).grandTotal,
        vat: findLabourAndVat(5000).vat,
        labour: findLabourAndVat(5000).labour,
        features: ['Scan', 'Detailed 20 point inspection', ]
    },

    Comprehensive: {
        cost: 10000,
        price: findLabourAndVat(10000).grandTotal,
        vat: findLabourAndVat(10000).vat,
        labour: findLabourAndVat(10000).labour,
        features: ['Scan', 'Detailed 120 point inspection', ]
    }   
}

export const changeTime = (value, type = 'mins') => {
    const valueToInt = Number.parseInt(value)

    if(value === "Choose Date" || value === 'Choose Time') return value

    if(type === 'hours' && valueToInt === 23) return `00`
    if(type === 'hours' && valueToInt !== 23) return `${valueToInt+1}`

    if (Number.parseInt(value) < 10) return `0${value}`

    return value
}