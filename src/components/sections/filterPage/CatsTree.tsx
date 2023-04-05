// ** React Core
import { useEffect, useState } from "react"
import { useGlobalContext } from "src/contexts"

// ** MUI imports
import { Box, Accordion, AccordionSummary, Typography, AccordionDetails, Button } from "@mui/material"
import { TreeView, TreeItem } from "@mui/lab"

// ** Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

// ** Types
import { ProductType } from "src/types/createProduct"

type AllCatsObjType = {
  [key: string]: { [key: string]: string[] }
}

interface PropsType {
  saveCatsHandler: (data: string, type: string, isExpanded: boolean) => void
}

// ** Vars
let allCatsObj: AllCatsObjType = {}
let expandStrings: string[] = []

const CatsTree = (props: PropsType) => {
  const { saveCatsHandler } = props
  const { products } = useGlobalContext()
  const [expanded, setExpanded] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])

  // ** Handle Funcs
  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds)
    console.log()
  }

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds)
  }

  const handleExpandClick = () => {
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? [...expandStrings] : []))
  }

  useEffect(() => {
    const makeCatsObj = () => {
      products.map((product: ProductType) => {
        if (allCatsObj.hasOwnProperty(product.section_cat.label)) {
          if (allCatsObj[product.section_cat.label].hasOwnProperty(product.main_cat.label)) {
            if (allCatsObj[product.section_cat.label][product.main_cat.label]?.indexOf(product.sub_cat.label) === -1) {
              allCatsObj[product.section_cat.label][product.main_cat.label].push(product.sub_cat.label)
            }
          } else {
            allCatsObj[product.section_cat.label][product.main_cat.label] = [product.sub_cat.label]
          }
        } else {
          allCatsObj[product.section_cat.label] = {}
          allCatsObj[product.section_cat.label][product.main_cat.label] = [product.sub_cat.label]
          console.log(allCatsObj)
        }
      })
    }
    makeCatsObj()
  }, [])

  const renderTree = () => {
    return Object.keys(allCatsObj).map((section, index) => {
      expandStrings.push(section)
      return (
        <TreeItem
          key={index}
          nodeId={section}
          label={section}
          onClick={() => saveCatsHandler(section, "section_cat", expanded.indexOf(section) === -1)}
        >
          {Object.keys(allCatsObj[section]).map((main, ind) => {
            expandStrings.push(main)
            return (
              <TreeItem
                key={index.toString() + ind.toString()}
                nodeId={main}
                label={main}
                onClick={() => saveCatsHandler(main, "main_cat", expanded.indexOf(main) === -1)}
              >
                {allCatsObj[section][main].map((sub, i) => {
                  return (
                    <TreeItem
                      key={index.toString() + ind.toString() + i.toString()}
                      nodeId={sub}
                      label={sub}
                      onClick={() => saveCatsHandler(sub, "sub_cat", expanded.indexOf(sub) === -1)}
                    />
                  )
                })}
              </TreeItem>
            )
          })}
        </TreeItem>
      )
    })
  }

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
        <Typography fontSize="24px" fontWeight="700">
          Categories
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mb: 1 }}>
          <Button onClick={handleExpandClick}>{expanded.length === 0 ? "Expand all" : "Collapse all"}</Button>
        </Box>
        <TreeView
          aria-label="controlled"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={expanded}
          selected={selected}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
        >
          {renderTree()}
        </TreeView>
      </AccordionDetails>
    </Accordion>
  )
}

export default CatsTree
