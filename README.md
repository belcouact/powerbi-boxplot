# Power BI Boxplot Visual

A custom boxplot visual for Power BI with comprehensive statistical visualization and customization options.

## Features

### Core Boxplot Elements
- **Box**: Interquartile range (IQR) with customizable color, opacity, and border radius
- **Median Line**: Configurable color and width
- **Mean Marker**: Optional mean indicator with multiple shape options
- **Whiskers**: Multiple whisker methods (IQR, standard deviation, percentiles)
- **Outliers**: Multiple outlier styles (circle, diamond, square, cross) with jitter support

### Advanced Features
- **Multi-level Categories**: Support for primary and sub-category grouping
- **Distribution Overlay**: Violin plot, beeswarm, ridgeline, or histogram overlay
- **Trend Lines**: Optional mean/median connecting lines across categories
- **Reference Lines**: Customizable reference lines with labels
- **Confidence Intervals**: Display confidence intervals for median
- **Statistics Display**: Show sample size (n), min, max, median, and mean

### Y-Axis Controls
- **Auto Mode**: Automatically adjusts range based on data (excludes outliers when hidden)
- **Manual Mode**: Set custom min/max values
- **Padding Control**: Adjustable percentage padding for auto mode

### Visual Customization
- **Orientation**: Vertical or horizontal layout
- **Color Options**: Single color or category-based coloring
- **Gridlines**: Customizable gridlines
- **Labels**: Configurable axis labels and data labels
- **Sorting**: Sort by category, median, mean, or sample size

## Installation

### Option 1: Import the compiled visual
1. Download the `.pbiviz` file from the `dist` folder
2. In Power BI Desktop, go to **Visualizations** pane
3. Click **Import a visual from marketplace** (three dots menu)
4. Select the downloaded `.pbiviz` file

### Option 2: Build from source
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run package
```

The compiled visual will be in the `dist` folder.

## Usage

### Data Fields
| Field | Type | Description |
|-------|------|-------------|
| Category | Grouping | Primary category for grouping |
| Sub Category | Grouping (Optional) | Secondary category for nested grouping |
| Values | Measure | Numeric values to visualize |

### Format Pane Options

#### Box Style
| Property | Description | Default |
|----------|-------------|---------|
| Box Color | Primary box color | #4292c6 |
| Use Category Colors | Color boxes by category | true |
| Box Fill Style | Solid or gradient | solid |
| Box Border Radius | Rounded corners | 0 |
| Box Opacity | Transparency level | 0.7 |
| Box Width | Relative box width | 0.5 |

#### Median & Mean
| Property | Description | Default |
|----------|-------------|---------|
| Show Median | Display median line | true |
| Median Color | Median line color | #2171b5 |
| Show Mean | Display mean marker | false |
| Mean Color | Mean marker color | #d62728 |
| Mean Shape | Circle, diamond, square, triangle | circle |
| Show Mean Line | Connect means across categories | false |
| Show Median Line | Connect medians across categories | false |

#### Whiskers
| Property | Description | Default |
|----------|-------------|---------|
| Whisker Method | IQR, Standard Deviation, Percentile, Min/Max | iqr |
| Whisker Color | Whisker line color | #08306b |
| Whisker Style | Solid, dashed, T-bar | T |
| Cap Width | Whisker cap width relative to box | 0.5 |
| Std Dev Multiplier | Multiplier for std dev method | 2 |

#### Outliers
| Property | Description | Default |
|----------|-------------|---------|
| Show Outliers | Display outlier points | true |
| Outlier Style | Circle, diamond, square, cross, hidden | circle |
| Outlier Color | Outlier fill color | #c94c4c |
| Outlier Size | Point size | 4 |
| Jitter Outliers | Add horizontal jitter to prevent overlap | false |
| Jitter Amount | Jitter intensity | 0.3 |

#### Distribution Overlay
| Property | Description | Default |
|----------|-------------|---------|
| Show Distribution | Display distribution overlay | false |
| Distribution Type | Violin, beeswarm, ridgeline, histogram | violin |
| Distribution Color | Overlay color | #4292c6 |
| Distribution Opacity | Overlay transparency | 0.3 |
| Bandwidth | KDE bandwidth | 0.5 |

#### Axis Settings
| Property | Description | Default |
|----------|-------------|---------|
| Orientation | Vertical or horizontal | vertical |
| Y-Axis Range | Auto or manual | auto |
| Y-Axis Min | Manual minimum value | 0 |
| Y-Axis Max | Manual maximum value | 100 |
| Y-Axis Padding (%) | Auto mode padding percentage | 10 |
| Show Gridlines | Display gridlines | true |

#### Data Labels
| Property | Description | Default |
|----------|-------------|---------|
| Show Statistics | Display statistical summary | false |
| Show Labels | Display value labels | false |
| Label Color | Label text color | #333333 |
| Label Font Size | Label text size | 10 |

#### Reference Lines
| Property | Description | Default |
|----------|-------------|---------|
| Show Reference Line | Display reference line | false |
| Reference Line Value | Y-axis position | 0 |
| Reference Line Color | Line color | #ff0000 |
| Reference Line Style | Solid, dashed, dotted | dashed |
| Reference Line Label | Optional label text | "" |

#### Sorting
| Property | Description | Default |
|----------|-------------|---------|
| Sort By | Category, median, mean, sample size | category |
| Sort Order | Ascending or descending | ascending |

## Development

### Project Structure
```
boxplotVisual/
├── assets/           # Visual assets (icon)
├── dist/             # Compiled visual
├── src/
│   ├── settings.ts   # Default settings and configuration
│   └── visual.ts     # Main visual implementation
├── style/
│   └── visual.less   # CSS styles
├── capabilities.json # Data roles and properties
├── pbiviz.json       # Visual metadata
├── package.json      # Dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

### Build Commands
```bash
# Install dependencies
npm install

# Start development server (for use with Power BI service)
npm start

# Package for production
npm run package

# Run linting
npm run lint
```

### Regenerate Icon
```bash
node create-icon.js
```

## Requirements

- Power BI Desktop (October 2018 or later)
- Node.js 14+ (for development)

## License

MIT

## Author

Alex Luo (aluo@wlgore.com)
