export type Category =
  | 'computers'
  | 'kvm'
  | 'display'
  | 'audio'
  | 'peripherals'
  | 'network'
  | 'power'
  | 'furniture'
  | 'homelab'
  | 'extras';

export interface GearItem {
  id: string;
  name: string;
  category: Category;
  subcategory?: string;
  description: string;
  specs: string[];
  link?: string;
  badge?: string;
  icon: string;
}

export const CATEGORIES: { id: Category | 'all'; label: string; icon: string }[] = [
  { id: 'all',         label: 'All',         icon: 'LayoutGrid' },
  { id: 'computers',   label: 'Computers',   icon: 'Laptop' },
  { id: 'kvm',         label: 'KVM & I/O',   icon: 'ArrowLeftRight' },
  { id: 'display',     label: 'Display',     icon: 'Monitor' },
  { id: 'audio',       label: 'Audio',       icon: 'Headphones' },
  { id: 'peripherals', label: 'Peripherals', icon: 'Keyboard' },
  { id: 'network',     label: 'Network',     icon: 'Network' },
  { id: 'power',       label: 'Power',       icon: 'Zap' },
  { id: 'furniture',   label: 'Furniture',   icon: 'Armchair' },
  { id: 'homelab',     label: 'Homelab',     icon: 'Server' },
  { id: 'extras',      label: 'Extras',      icon: 'Sparkles' },
];

// Connection graph edges — used by ConnectionGraph component
export interface GearEdge {
  source: string;
  target: string;
  label: string;
  type: 'signal' | 'power' | 'network' | 'physical';
}

export const GEAR_EDGES: GearEdge[] = [
  // KVM signal chain
  { source: 'asus-tuf',   target: 'kvm',       label: 'HDMI + USB',  type: 'signal' },
  { source: 'macbook',    target: 'kvm',       label: 'HDMI + USB',  type: 'signal' },
  { source: 'kvm',        target: 'monitor',   label: 'HDMI',        type: 'signal' },
  { source: 'kvm',        target: 'keyboard',  label: 'USB HID',     type: 'signal' },
  { source: 'kvm',        target: 'mouse',     label: 'USB HID',     type: 'signal' },
  { source: 'kvm',        target: 'mic',       label: 'USB',         type: 'signal' },
  { source: 'kvm',        target: 'fosi-dac',  label: 'USB Audio',   type: 'signal' },
  // Audio chain
  { source: 'fosi-dac',   target: 'mackie',    label: 'RCA',         type: 'signal' },
  { source: 'asus-tuf',   target: 'ifi-go',    label: 'USB-C',       type: 'signal' },
  { source: 'ifi-go',     target: 'ie200',     label: '3.5mm',       type: 'signal' },
  { source: 'ifi-go',     target: 'moondrop',  label: '3.5mm',       type: 'signal' },
  // Network
  { source: 'router',     target: 'switch',    label: 'Ethernet',    type: 'network' },
  { source: 'switch',     target: 'asus-tuf',  label: 'Ethernet',    type: 'network' },
  { source: 'switch',     target: 'pi5',       label: 'Ethernet',    type: 'network' },
  { source: 'macbook',    target: 'router',    label: 'WiFi 6',      type: 'network' },
  { source: 'xiaomi15',   target: 'router',    label: 'WiFi',        type: 'network' },
  // Display accessories
  { source: 'monitor-arm', target: 'monitor', label: 'VESA mount',   type: 'physical' },
  { source: 'light-bar',  target: 'monitor',  label: 'Clamp',        type: 'physical' },
  // Peripherals
  { source: 'mousepad',   target: 'mouse',    label: 'Surface',      type: 'physical' },
  { source: 'asus-tuf',   target: 'controller', label: 'Wireless',   type: 'signal' },
  // Power
  { source: 'havells-a',  target: 'desk',      label: 'AC',          type: 'power' },
  { source: 'havells-a',  target: 'monitor',   label: 'AC',          type: 'power' },
  { source: 'havells-a',  target: 'light-bar', label: 'AC',          type: 'power' },
  { source: 'havells-a',  target: 'mackie',    label: 'AC',          type: 'power' },
  { source: 'belkin-8',   target: 'nest-hub',  label: 'AC',          type: 'power' },
  { source: 'belkin-8',   target: 'macbook',   label: 'Charge',      type: 'power' },
  { source: 'belkin-8',   target: 'havells-b', label: 'Extension',   type: 'power' },
  { source: 'havells-b',  target: 'asus-tuf',  label: 'Charge',      type: 'power' },
  { source: 'havells-b',  target: 'switch',    label: 'AC',          type: 'power' },
  { source: 'havells-b',  target: 'pi5',       label: 'AC',          type: 'power' },
  // Homelab
  { source: 'pi5',        target: 'nest-hub',  label: 'Home Asst',   type: 'signal' },
  // DJI gimbal connection to phone
  { source: 'xiaomi15',   target: 'dji-osmo',      label: 'DJI Mimo',    type: 'signal' },
  { source: 'xiaomi15',   target: 'nothing-ear3',  label: 'Bluetooth',   type: 'signal' },
];

export const GEAR: GearItem[] = [
  // COMPUTERS
  {
    id: 'asus-tuf',
    name: 'Asus TUF Gaming F15',
    category: 'computers',
    description: 'Primary Windows machine. Ethernet-direct into the TL-SG105E managed switch. iFi GO Link and KVM both connect here.',
    specs: [
      'Intel Core i5-10300H @ 2.50GHz',
      'NVIDIA GeForce GTX 1650 GDDR6 4GB 128-bit',
      'Ethernet via TL-SG105E switch',
      'iFi GO Link plugged directly in',
      'KVM via HDMI + USB',
    ],
    link: 'https://www.asus.com/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-f15/',
    badge: 'Windows',
    icon: 'Laptop',
  },
  {
    id: 'macbook',
    name: 'MacBook Pro 16" M3 Pro',
    category: 'computers',
    description: 'Apple silicon creative and dev workstation. WiFi 6 to the AX1500 router. USB-A peripherals through TP-Link hub. Headphones via 3.5mm jack.',
    specs: [
      'Apple M3 Pro',
      '36GB unified memory',
      '1TB SSD',
      'Space Gray 16-inch',
      'TP-Link UH3020C USB hub',
      'WiFi 6 direct to AX1500',
      'Headphones via 3.5mm jack (no external DAC)',
    ],
    link: 'https://www.apple.com/macbook-pro/',
    badge: 'macOS',
    icon: 'Laptop',
  },
  {
    id: 'pi5',
    name: 'Raspberry Pi 5 · 16GB',
    category: 'computers',
    description: 'Always-on Linux homelab node. Running Home Assistant for smart home control, plus Docker containers and a k3s Kubernetes cluster.',
    specs: [
      'Raspberry Pi 5',
      '16GB RAM',
      'Home Assistant OS',
      'Docker containers',
      'k3s (lightweight Kubernetes)',
      'Wired Ethernet via TL-SG105E',
      'Powered from Havells 4-port (B)',
    ],
    link: 'https://www.raspberrypi.com/products/raspberry-pi-5/',
    badge: 'Linux',
    icon: 'Server',
  },
  {
    id: 'xiaomi15',
    name: 'Xiaomi 15',
    category: 'computers',
    description: 'Daily driver phone. White colourway, 512GB. Connects to the AX1500 router via WiFi and pairs with the DJI Osmo for shooting.',
    specs: [
      'Snapdragon 8 Elite',
      '512GB storage',
      'White colourway',
      'Leica Summilux camera system',
      'WiFi 7 → AX1500 router',
      'DJI Mimo app for gimbal control',
    ],
    link: 'https://www.mi.com/in/product/xiaomi-15',
    badge: 'Android',
    icon: 'Smartphone',
  },
  {
    id: 'dell-laptop',
    name: 'Dell Laptop',
    category: 'computers',
    description: 'A temporary replacement machine traded with a friend.',
    specs: [
      'Loaned for temporary use',
    ],
    link: 'https://www.amazon.in/dp/B07YKZ7VTS?ref=cm_sw_r_cp_ud_dp_4G4RG7WH62AEFAFZ2VM6&ref_=cm_sw_r_cp_ud_dp_4G4RG7WH62AEFAFZ2VM6&social_share=cm_sw_r_cp_ud_dp_4G4RG7WH62AEFAFZ2VM6&th=1',
    badge: 'Traded / Temp',
    icon: 'Laptop',
  },

  // KVM
  {
    id: 'kvm',
    name: 'Ugreen HDMI KVM Switch',
    category: 'kvm',
    description: 'The nervous system. One monitor, keyboard, mouse, and mic shared instantly between both machines. Comes with its own desktop button controller.',
    specs: [
      '1 monitor · 2 computers',
      'HDMI · 4K@60Hz · HDR',
      '4 shared USB ports',
      'Includes desktop controller',
      'Bundled: 2× HDMI cables + 2× USB cables',
    ],
    link: 'https://www.amazon.in/dp/B0CG1W5K7C',
    badge: 'Core',
    icon: 'ArrowLeftRight',
  },

  // DISPLAY
  {
    id: 'monitor',
    name: 'Acer Nitro XV272U V3',
    category: 'display',
    description: '27" WQHD IPS. Fast enough for gaming, accurate enough for colour work. Mounted on a Jin Office gas spring arm — stock stand not used.',
    specs: [
      '27" IPS, 2560×1440 WQHD',
      '180Hz refresh rate',
      '0.5ms response time (GTG)',
      'AMD FreeSync Premium',
      'DisplayHDR 400 · DCI-P3 95%',
      'Delta E<1 factory calibration',
      'Mounted on Jin Office gas spring arm',
    ],
    link: 'https://www.amazon.in/dp/B0CF5TCQKL',
    icon: 'Monitor',
  },
  {
    id: 'monitor-arm',
    name: 'Jin Office Gas Spring Arm',
    category: 'display',
    subcategory: 'Mount',
    description: 'Single monitor gas spring arm. Holds the Acer Nitro XV272U V3 — replaces the stock stand entirely.',
    specs: [
      'Gas spring mechanism',
      'Full articulation: height, tilt, swivel, rotation',
      'Single monitor',
      'C-clamp desk mount',
    ],
    icon: 'Monitor',
  },
  {
    id: 'light-bar',
    name: 'Quntis HY214 PRO',
    category: 'display',
    subcategory: 'Lighting',
    description: 'Monitor light bar clamped to top of the Acer Nitro. No screen glare, warm/cool temperature, sits cleanly above the panel.',
    specs: [
      'Clamp mount on XV272U V3',
      'Warm + cool colour temperature',
      'Asymmetric downward throw, no panel glare',
      'Touch controls',
    ],
    link: 'https://www.quntis.com/products/quntis-monitor-light-bar-e-reading-pro',
    icon: 'Sun',
  },

  // AUDIO
  {
    id: 'fosi-dac',
    name: 'Fosi Audio K5 Pro',
    category: 'audio',
    subcategory: 'DAC / Amp',
    description: 'Desktop DAC/amp stack driving the Mackie CR3-X monitors. USB audio from whichever machine the KVM is currently on.',
    specs: [
      'USB + optical + coaxial input',
      'RCA output → Mackie CR3-X',
      '6.35mm headphone output',
      'Bass + treble tone controls',
      'Fed via KVM USB audio',
    ],
    link: 'https://www.fosiaudiotech.com/products/fosi-audio-k5-pro',
    icon: 'AudioLines',
  },
  {
    id: 'mackie',
    name: 'Mackie CR3-X',
    category: 'audio',
    subcategory: 'Studio Monitors',
    description: 'Studio reference monitors. Driven by Fosi K5 Pro. Flanking the monitor on the monitor riser for proper ear-level placement.',
    specs: [
      '3" woofer + 0.75" tweeter',
      '50Hz – 20kHz response',
      'RCA input from K5 Pro',
      'Sits on monitor riser at ear level',
    ],
    link: 'https://mackie.com/en/products/studio-monitors/cr-creative-reference-multimedia-monitors/CR3-X.html',
    icon: 'Speaker',
  },
  {
    id: 'ifi-go',
    name: 'iFi Audio GO Link',
    category: 'audio',
    subcategory: 'Portable DAC',
    description: 'Pocket USB-C DAC/amp dongle. Plugged directly into the Asus TUF — for IEM listening on the Windows machine.',
    specs: [
      'USB-C bus powered',
      'MQA rendering',
      '3.5mm SE output',
      'Plugged directly into Asus TUF F15',
      'Windows-only use',
    ],
    link: 'https://ifi-audio.com/products/go-link/',
    icon: 'AudioLines',
  },
  {
    id: 'ie200',
    name: 'Sennheiser IE 200',
    category: 'audio',
    subcategory: 'IEMs',
    description: 'Reference-tuned Sennheiser IEMs. Used via iFi GO Link on the Asus TUF.',
    specs: [
      '7mm dynamic driver',
      'Sennheiser IE reference tuning',
      'Detachable 2-pin cable',
      'Via iFi GO Link on Windows',
    ],
    link: 'https://www.sennheiser.com/en-in/catalog/products/headphones/ie-200/ie-200-509182',
    icon: 'Headphones',
  },
  {
    id: 'moondrop',
    name: 'Moondrop Old Fashioned',
    category: 'audio',
    subcategory: 'IEMs',
    description: 'Alternate IEM pair. Swapped in when the IE 200 needs a rest. Also via iFi GO Link on Windows.',
    specs: [
      'Dynamic driver',
      'Moondrop Harman-target tuning',
      'Via iFi GO Link on Windows',
    ],
    link: 'https://www.moondroplab.com/en/products/the-old-fashioned',
    icon: 'Headphones',
  },
  {
    id: 'nothing-ear3',
    name: 'Nothing Ear (3)',
    category: 'audio',
    subcategory: 'TWS',
    description: 'Daily driver earbuds. Bluetooth-paired with the Xiaomi 15 for music and calls on the go.',
    specs: [
      '11mm dynamic driver',
      'ANC + Transparency mode',
      'ChatGPT integration',
      'Bluetooth 5.3',
      'Paired with Xiaomi 15',
    ],
    link: 'https://in.nothing.tech/products/ear',
    badge: 'Daily',
    icon: 'Headphones',
  },
  {
    id: 'moondrop-chu2',
    name: 'Moondrop Chu 2',
    category: 'audio',
    subcategory: 'IEMs',
    description: 'Retired. First serious IEM — the one that started the rabbit hole. Now resting.',
    specs: [
      '10mm dynamic driver',
      'Neutral-bright Moondrop tuning',
      'Detachable 0.78mm 2-pin cable',
      'Retired',
    ],
    link: 'https://www.moondroplab.com/en/products/chu-ii',
    badge: 'Retired',
    icon: 'Headphones',
  },
  {
    id: 'jbl-q100',
    name: 'JBL Quantum 100',
    category: 'audio',
    subcategory: 'Headset',
    description: 'Retired gaming headset. Entry point before moving to the studio monitor + IEM setup.',
    specs: [
      '40mm drivers',
      '3.5mm wired',
      'Flip-to-mute boom mic',
      'Retired',
    ],
    link: 'https://www.jbl.com/gaming-headsets/QUANTUM-100.html',
    badge: 'Retired',
    icon: 'Headphones',
  },

  // PERIPHERALS
  {
    id: 'rk-r87',
    name: 'Royal Kludge RK-R87 Pro',
    category: 'peripherals',
    subcategory: 'Keyboard',
    description: 'TKL 80% board in Half Grey. RK Chartreuse linear switches, dressed with XVX side-printed gradient grey keycaps.',
    specs: [
      '80% TKL layout',
      'RK Chartreuse linear switches',
      'XVX Gradient Grey side-printed keycaps',
      'Half Grey colourway',
      'Tri-mode: USB / Bluetooth / 2.4GHz',
    ],
    link: 'https://meckeys.com/shop/keyboard/80-keyboard/royal-kludge-rk-r87-pro/?attribute_pa_colour-style=half-grey&attribute_pa_key-switches=rk-chartreuse',
    badge: 'Shared',
    icon: 'Keyboard',
  },
  {
    id: 'keyboard',
    name: 'NuPhy Air75 V3',
    category: 'peripherals',
    subcategory: 'Keyboard',
    description: 'Low-profile 75% mechanical keyboard. Shared between both machines via KVM. Tri-mode wireless.',
    specs: [
      '75% compact layout',
      'Low-profile mechanical switches',
      'Tri-mode: USB / Bluetooth / 2.4GHz',
      'Shared via KVM USB HID',
    ],
    link: 'https://nuphy.com/products/air75-v3',
    icon: 'Keyboard',
  },
  {
    id: 'mouse',
    name: 'Razer Viper Mini',
    category: 'peripherals',
    subcategory: 'Mouse',
    description: 'Ultra-lightweight wired gaming mouse. Shared between both machines via KVM.',
    specs: [
      '61g ultralight',
      '8500 DPI optical sensor',
      'Wired USB',
      'Shared via KVM',
    ],
    link: 'https://www.razer.com/gaming-mice/razer-viper-mini/RZ01-03250100-R3U1',
    icon: 'Mouse',
  },
  {
    id: 'mic',
    name: 'FIFINE A6T',
    category: 'peripherals',
    subcategory: 'Microphone',
    description: 'USB condenser mic on an arm. Shared via KVM so both machines get mic access for calls and recording.',
    specs: [
      'USB condenser',
      'Cardioid polar pattern',
      'Touch-mute button',
      'Shared via KVM USB',
    ],
    link: 'https://www.fifine.in/products/fifine-a6t',
    icon: 'Mic',
  },
  {
    id: 'mousepad',
    name: 'HyperX Pulsefire Mat',
    category: 'peripherals',
    subcategory: 'Mousepad',
    description: 'Medium-size cloth gaming mousepad. Precise surface for the Viper Mini.',
    specs: [
      'Medium size',
      'Precise cloth surface',
      'Anti-fray flush stitching',
      'Non-slip rubber base',
    ],
    link: 'https://www.hyperx.com/products/hyperx-pulsefire-mat-gaming-mouse-pad',
    icon: 'Square',
  },
  {
    id: 'controller',
    name: 'Kreo Mirage',
    category: 'peripherals',
    subcategory: 'Controller',
    description: 'Wireless game controller. Windows-only, not routed through KVM.',
    specs: [
      'Wireless',
      'RGB lighting',
      'Vibration motors',
      'Windows-only · not via KVM',
    ],
    link: 'https://www.kreo.net/products/mirage-gaming-controller',
    icon: 'Gamepad2',
  },

  // NETWORK
  {
    id: 'router',
    name: 'TP-Link WiFi 6 AX1500',
    category: 'network',
    description: 'Main router. ISP feeds into this. MacBook Pro connects wirelessly. Feeds the TL-SG105E switch via Ethernet for wired devices.',
    specs: [
      'WiFi 6 (802.11ax)',
      'AX1500 dual-band',
      'Main WAN device',
      'MacBook Pro connects via WiFi',
      'Ethernet out → TL-SG105E switch',
    ],
    link: 'https://www.tp-link.com/in/home-networking/wifi-router/archer-ax10/',
    icon: 'Wifi',
  },
  {
    id: 'switch',
    name: 'TP-Link TL-SG105E',
    category: 'network',
    description: '5-port managed switch. Fed by the AX1500 router. Provides wired Ethernet to the Asus TUF and Raspberry Pi 5.',
    specs: [
      '5-port Gigabit managed switch',
      'Fed by TP-Link AX1500 router',
      'Asus TUF F15 → port 1',
      'Raspberry Pi 5 → port 2',
      'VLAN / QoS capable',
    ],
    link: 'https://www.tp-link.com/in/business-networking/easy-smart-switch/tl-sg105e/',
    icon: 'Network',
  },

  // HOMELAB (now just services, Pi5 moved to computers)
  // (empty — Pi 5 is in computers)

  // POWER
  {
    id: 'havells-a',
    name: 'Havells 4-port Strip A',
    category: 'power',
    description: 'Primary strip powering the desk infrastructure.',
    specs: [
      'Standing desk motor',
      'Acer Nitro XV272U V3 monitor',
      'Quntis HY214 PRO light bar',
      'Mackie CR3-X speakers',
    ],
    icon: 'Zap',
  },
  {
    id: 'belkin-8',
    name: 'Belkin 8-port Strip',
    category: 'power',
    description: 'Secondary power hub for personal devices and Mac.',
    specs: [
      'Phone charger',
      'Google Nest Hub',
      'MacBook Pro charger',
      'Feeds Havells 4-port B via extension',
    ],
    icon: 'Zap',
  },
  {
    id: 'havells-b',
    name: 'Havells 4-port Strip B',
    category: 'power',
    description: 'Extension off the Belkin strip for Windows-side devices.',
    specs: [
      'Asus TUF F15 charger',
      'TP-Link TL-SG105E switch',
      'Raspberry Pi 5',
      'Fed by Belkin 8-port',
    ],
    icon: 'Zap',
  },

  // FURNITURE
  {
    id: 'desk',
    name: 'The Sleep Company Standing Desk',
    category: 'furniture',
    description: 'Motorised sit-stand desk. The base everything sits on.',
    specs: [
      'Electric height adjustment',
      'Memory height presets',
      'Anti-collision safety',
      'Steel frame',
    ],
    link: 'https://www.amazon.in/dp/B0D7QFX2YG',
    icon: 'RectangleHorizontal',
  },
  {
    id: 'chair',
    name: 'Green Soul Zodiac',
    category: 'furniture',
    description: 'Ergonomic work/gaming chair for long sessions.',
    specs: [
      'Ergonomic lumbar support',
      'Adjustable armrests',
      'High back design',
      'Recline + tilt lock',
    ],
    link: 'https://greensoul.in/products/zodiac-plus',
    icon: 'Armchair',
  },
  {
    id: 'table-runner',
    name: 'IKEA SVÄRTSENA Table Runner',
    category: 'furniture',
    subcategory: 'Desk Surface',
    description: 'Grey IKEA table runner on the desk surface. Adds texture and protects the surface.',
    specs: ['Grey colourway', 'IKEA SVÄRTSENA'],
    link: 'https://www.ikea.com/in/en/search/?q=SVÄRTSENA',
    icon: 'Minus',
  },

  // EXTRAS
  {
    id: 'nest-hub',
    name: 'Google Nest Hub 2nd gen',
    category: 'extras',
    description: 'Smart display on the desk corner. Quick timers, weather, Home Assistant controls without reaching for a phone.',
    specs: [
      '7" display',
      'Google Assistant',
      'Smart home hub',
      'Sleep Sensing',
      'Powered from Belkin strip',
    ],
    link: 'https://store.google.com/in/product/nest_hub_2nd_gen',
    icon: 'TabletSmartphone',
  },
  {
    id: 'dji-osmo',
    name: 'DJI Osmo Mobile 7P',
    category: 'extras',
    subcategory: 'Gimbal',
    description: '3-axis smartphone gimbal. Pairs with the Xiaomi 15 via DJI Mimo app for video work.',
    specs: [
      '3-axis stabilisation',
      'ActiveTrack 6.0',
      'Magnetic quick-attach',
      'Built-in extension rod',
      'Pairs with Xiaomi 15 via DJI Mimo',
    ],
    link: 'https://www.dji.com/osmo-mobile-7-pro',
    icon: 'Video',
  },
];
