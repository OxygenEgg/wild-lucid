# Better Bloom

Minimal and Dynamic Bloom theme inspired by [Bloom](https://github.com/nimsandu/spicetify-bloom)

[Join](https://discord.gg/PJwgBG2z) new support discord server. [Better-Bloom](https://discord.gg/PJwgBG2z)

## Screenshots

### Dark (default)

![Base Dark Preview](./assets/images/base.png)
![Dark Preview 1](./assets/images/better-bloom-dark0.png)
![Dark Preview 0](./assets/images/better-bloom-dark.png)
![Dark 1 Preview 2](./assets/images/better-bloom-dark1.png)
![Dark 2 Preview 3](./assets/images/better-bloom-dark2.png)

### Light

![Light Preview](./assets/images/better-bloom-light.png)
![Light Preview 1](./assets/images/better-bloom-light1.png)

### Comfy

![Comfy Preview](./assets/images/better-bloom-comfy.png)
![Comfy Preview 1](./assets/images/better-bloom-comfy1.png)

### Darkgreen

![DarkGreen Preview](./assets/images/better-bloom-darkgreen.png)
![DarkGreen Preview 1](./assets/images/better-bloom-darkgreen1.png)

### Violet

![Violet Preview](./assets/images/better-bloom-violet.png)
![Violet Preview 1](./assets/images/better-bloom-violet1.png)

### Dark-Fluent

![Dark-Fluent Preview](./assets/images/better-bloom-dark-fluent.png)
![Dark-Fluent Preview 1](./assets/images/better-bloom-dark-fluent1.png)

### Dark-Bloom

![Dark-Bloom Preview](./assets/images/better-bloom-dark-bloom.png)
![Dark-Bloom Preview 1](./assets/images/better-bloom-dark-bloom.png)

## Installation

### Scripts

#### Windows (Powershell)

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
iex "& { $(iwr -useb 'https://sanoojes.github.io/better-bloom/install/Better-Bloom.ps1') }"
```

#### Linux/macOS (Bash)

```bash
curl -fsSL https://raw.githubusercontent.com/sanoojes/better-bloom/main/install/install.sh | bash
```

### Spicetify Marketplace

Simply install [spicetify-marketplace](https://github.com/spicetify/spicetify-marketplace) by following it's
[installation instructions](https://github.com/spicetify/spicetify-marketplace/wiki/Installation). Then look for `better-bloom` theme and click the install button.

### Manual Installation

Use this guide to install if you're having trouble using the shell commands/installation scripts:

1. Download this repo as [archive](https://codeload.github.com/sanoojes/better-bloom/zip/refs/heads/main).
2. Navigate to the Spicetify's `Themes` directory. Use `spicetify path userdata` command to get the path.
3. In the directory, create a new folder called `better-bloom`.
4. Open the downloaded repo archive, and move all of the files from the `src` subfolder to the `better-bloom` folder you created.
5. Open a terminal/command prompt window and type the following commands:

   ```shell
    spicetify config current_theme better-bloom color_scheme dark
    spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
    spicetify apply
   ```

## Customization

### Color Scheme

The `dark` color scheme is applied by default during the installation process. If you install better-bloom via PowerShell the installed color scheme depends on your Windows settings.

The available color schemes are: `dark` `light` `dark-green` `coffee` `comfy` `dark-fluent` . Apply one using the following commands:

```shell
spicetify config color_scheme <color scheme>
spicetify apply
```

If you installed better-bloom from Marketplace you can change the color scheme on its page.

### Accent Color

1. Navigate to the Spicetify's `Themes` directory. Use `spicetify path userdata` command to get the path.
2. Open `better-bloom` folder.
3. Edit your current color scheme in the `color.ini` file.
4. Use the `spicetify apply` command.

If you installed better-bloom from Marketplace you can change the accent color using built-in `Color.ini Editor`.

## Updating Theme

### Windows (PowerShell)

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
iex "& { $(iwr -useb 'https://raw.githubusercontent.com/sanoojes/better-bloom/main/install/better-bloom.ps1') } -Action Update"
```

## Credits

volumePercentage, quickQueue ,npvAmbience taken from [ohitstom/spicetify-extensions](https://github.com/ohitstom/spicetify-extensions)

## License

[MIT License](LICENSE)
