import styled from 'styled-components';
import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useGetScrapCount } from '@/api/count';
import { useGetToken } from '@/hooks/useAccount';

import ScrapListHeader from '@/components/molcules/ScrapListHeader';
import MatchTemplateWithTypeAndCount from '@/components/templates/MatchTemplateWithTypeAndCount';

interface ScrapTemplateProps {
    type: string,
}

function ScrapTemplate({ type }: ScrapTemplateProps) {
    const token = useGetToken();
    const providingTemplates = ['other', 'list', 'video', 'product', 'article'];

    const { data, isLoading, isFetched } = useQuery(['scrapCount', type],
        () => {
            return providingTemplates.includes(type)
                ? (token && useGetScrapCount({ type: type, token: token }))
                : { data: { count: 0 } };
        },
        {
            enabled: !!token,
            refetchOnWindowFocus: false,
            select: (data) => {
                return data?.data.count;
            }
        }
    );

    if (isLoading) {
        return <CircularProgress
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }} />;
    }

    return (
        <>
            <ScrapListContainer>
                {isFetched && <ScrapListHeader type={type} count={data} />}
                <Box
                    sx={{
                        height: 'calc(100% - 145px)',
                    }}
                >
                    {isFetched && <MatchTemplateWithTypeAndCount type={type} count={data} />}
                </Box>
            </ScrapListContainer>
        </>
    );
}

const ScrapListContainer = styled.div`
    width: calc(100% - 209px);
    height: calc(100% - 56px);
    position: fixed;
    right: 0;
    top: 56px;
    @media screen and (max-width: 600px) {
      width: 100vw;
      left: 0;
    }
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 24px;
    box-sizing: border-box;
`

export default ScrapTemplate;
