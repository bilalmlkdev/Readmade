import { BLOCK_TYPES } from "../../lib/blocks.js";
import TitleBlock from "./TitleBlock.jsx";
import BadgesBlock from "./BadgesBlock.jsx";
import DescriptionBlock from "./DescriptionBlock.jsx";
import FeaturesBlock from "./FeaturesBlock.jsx";
import InstallationBlock from "./InstallationBlock.jsx";
import UsageBlock from "./UsageBlock.jsx";
import ScreenshotsBlock from "./ScreenshotsBlock.jsx";
import ApiBlock from "./ApiBlock.jsx";
import ContributingBlock from "./ContributingBlock.jsx";
import LicenseBlock from "./LicenseBlock.jsx";
import CustomBlock from "./CustomBlock.jsx";

const BLOCK_EDITORS = {
  [BLOCK_TYPES.TITLE]: TitleBlock,
  [BLOCK_TYPES.BADGES]: BadgesBlock,
  [BLOCK_TYPES.DESCRIPTION]: DescriptionBlock,
  [BLOCK_TYPES.FEATURES]: FeaturesBlock,
  [BLOCK_TYPES.INSTALLATION]: InstallationBlock,
  [BLOCK_TYPES.USAGE]: UsageBlock,
  [BLOCK_TYPES.SCREENSHOTS]: ScreenshotsBlock,
  [BLOCK_TYPES.API]: ApiBlock,
  [BLOCK_TYPES.CONTRIBUTING]: ContributingBlock,
  [BLOCK_TYPES.LICENSE]: LicenseBlock,
  [BLOCK_TYPES.CUSTOM]: CustomBlock,
};

export default function EditBlockFields({ block, content, setContent }) {
  const Editor = BLOCK_EDITORS[block.type];
  if (!Editor) {
    return (
      <p className="text-gray-500 text-[13px]">
        No editable fields for this block type.
      </p>
    );
  }
  return <Editor content={content} setContent={setContent} />;
}
