# watermark-pages

Watermark pages with a noticeable message.

![Example Watermark](examples/example-watermark.jpg)

## Installation

This extension is not currently published on the Chrome Web Store. To use:

- Clone this repo to a folder on your local machine.
- Go to [chrome://extensions](chrome://extensions) and enable **Developer mode**
- Select **Load unpacked**, and select this repo

You can also download the `.crx` file from a release and `unzip` it, instead of cloning the repo.

## Usage

Once installed:

- Click the extension icon
- Click `Add Row`
- Enter the details of the watermark you want
- Click `Save` (retro!)

The pattern you enter will be matched against the page URL as a regex. If it matches, a watermark will be applied.

The screenshot above is what you get for `pattern: https://example.org/`, `watermark: EXAMPLE`, `color: cyan`
