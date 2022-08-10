export {}
            // <Accordion elevation={0}
            //   sx={{
            //     mt: 3, border: 'solid 1px #c0c0c0', borderRadius: '10px', '&:before': {
            //       display: 'none',
            //     }
            //   }}
            //   expanded={expanded === `panel${index}`}
            //   onChange={handleChange(`panel${index}`)}>
            //   <AccordionSummary
            //     className='AccordionSummary'
            //     expandIcon={<ExpandMoreIcon />}
            //     aria-controls="panel1bh-content"
            //     id="panel1bh-header"
            //   >
            //     <Avatar alt="Remy Sharp" src={celebritiesData[index]['picture']} />
            //     <Typography variant="h6" sx={{ ml: 2 }}>
            //      {celebritiesData[index]['first']} {celebritiesData[index]['last']}
            //     </Typography>
            //   </AccordionSummary>
            //   <AccordionDetails>
            //     <Stack direction="row" justifyContent="flex-start" spacing={8}>
            //       <Stack direction="column" spacing={0}>
            //         <Typography variant='caption'>Age</Typography>
            //         <Typography variant='body1'>{getAge(celebritiesData[index]['dob'])} Years</Typography>
            //       </Stack>
            //       <Stack direction="column" spacing={0}>
            //         <Typography variant='caption'>Gender</Typography>
            //         {edit === index+1 ? 'Edit ': ''}
            //         <Typography variant='body1' sx={{ textTransform: 'capitalize' }}>{celebritiesData[index]['gender']}</Typography>
            //       </Stack>
            //       <Stack direction="column" spacing={0}>
            //         <Typography variant='caption'>Country</Typography>
            //         <Typography variant='body1'>{celebritiesData[index]['country']}</Typography>
            //       </Stack>
            //     </Stack>
            //     <Stack direction="column" spacing={0} sx={{ mt: 4 }}>
            //       <Typography variant='caption'>Description</Typography>
            //       <Typography variant='body1'>{celebritiesData[index]['description']}</Typography>
            //     </Stack>
            //     <Stack
            //       direction="row"
            //       justifyContent="flex-end"
            //       alignItems="center"
            //       sx={{ mt: 2 }}
            //     >
            //       <IconButton aria-label="edit" component="label" onClick={() => deleteCelebrity(celebritiesData[index]['id'])}>
            //         <DeleteForeverIcon sx={{ color: '#f26161' }} />
            //       </IconButton>
            //       <IconButton aria-label="edit" component="button" onClick={() => handleEditChange(celebritiesData[index]['id'])}>
            //         <EditIcon sx={{ color: '#0ca3fa' }} />
            //       </IconButton>
            //     </Stack>
            //   </AccordionDetails>
            // </Accordion>