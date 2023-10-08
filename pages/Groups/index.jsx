import { Container, Box, Grid } from '@mui/material';
import CommunityInfo from "../../components/Groups/CommunityInfo";
import MembersList from "../../components/Groups/MembersList";
import ProductPools from "../../components/Groups/ProductPools";

const Groups = () => {

    const handleAddProductPool = () => {
    };

    return (
        <Container style={{ padding: 0, maxWidth: '90%' }}> 
            <Box style={{ margin: '0 auto', marginTop: '6rem' }}>
                <Grid container spacing={3} style={{ background: '#F4F4F4', minHeight: '100vh' }} justifyContent="flex-start">

                    <Grid item xs={3}>
                        <CommunityInfo />
                        <MembersList />
                    </Grid>

                    <Grid item xs={9}>
                        <ProductPools onAddProductPool={handleAddProductPool} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Groups;
