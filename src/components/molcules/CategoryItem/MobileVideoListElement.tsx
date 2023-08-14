import { CardActionArea, Box, Typography } from "@mui/material";
import { useCategoryItemSelected } from "../../../context/CategoryItemContext";
import { useState } from "react";
import theme from "../../../assets/styles/theme";
import { contentProps } from "../../../types/ContentType";
import ColumnContainer from "../../atoms/ColumnContainer";
import { ShortcutIcon, MoreIcon } from "../../atoms/Icon";
import Overlay from "../../atoms/Overlay";
import RowContainer from "../../atoms/RowContainer";
import ThumbnailImage from "../../atoms/ThumbnailImage";
import CategoryItemHorizontal from "../../organisms/CategoryItemHorizontal";
import ScrapDeleteModal from "../../organisms/ScrapDeleteModal";
import ScrapEditModal from "../../organisms/ScrapEditModal";
import Tooltip from "../../atoms/Tooltip";
import { IconButtonListElement } from "../../atoms/CategoryItem/IconButtonListElement";
import { TitleElement } from "../../atoms/CategoryItem/TitleElement";
import { SiteNameElement } from "../../atoms/CategoryItem/SitenameElement";

interface MobileVideoListElementProps {
    content: contentProps['content'],
}

function MobileVideoListElement({ content }: MobileVideoListElementProps) {
    const { thumbnailUrl, siteName, title, } = content;
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();

    const varient = 'MobileVideo';

    function Header() {

        return (
            <>
                <RowContainer
                    style={{
                        gap: '5px',
                        width: '100%',
                        boxSizing: 'border-box',
                        justifyContent: 'space-between',
                        padding: '10px',
                    }}>
                    <ColumnContainer>
                        <SiteNameElement siteName={siteName} varient={varient} />
                        <TitleElement title={title} varient={varient} />
                    </ColumnContainer>
                    <IconButtonListElement content={content} />
                </RowContainer>
            </>
        )
    }

    return (
        <div
            style={{
                width: '100%',
                boxShadow: 'none',
                borderRadius: '0',
                display: 'block',
                backgroundColor: `${selectedContent.scrapId === content.scrapId ? theme.color.background_color : 'white'}`,
            }}
            onClick={() => setSelectedContent(content)}
        >
            <CardActionArea
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '5px',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                    }}
                >
                    {thumbnailUrl && <ThumbnailImage thumbnailUrl={thumbnailUrl} />}
                </Box>
                <Header content={content} />
            </CardActionArea>
        </div>
    )
}


export default MobileVideoListElement;
