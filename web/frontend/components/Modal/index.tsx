import { useState } from 'react'

import { Button, Checkbox, DropZone, Modal, Stack } from '@shopify/polaris'

// This is just a test modal. Please update it.
export default function LargeModalExample() {
  const [active, setActive] = useState(false)
  const [checked, setChecked] = useState(false)

  const toggleActive = () => setActive(active => !active)

  const handleCheckbox = (value: boolean) => setChecked(value)

  const activator = <Button onClick={toggleActive}>Open</Button>

  return (
    <div style={{ height: '500px' }}>
      <Modal
        large
        activator={activator}
        open={active}
        onClose={toggleActive}
        title='Import customers by CSV'
        primaryAction={{
          content: 'Import customers',
          onAction: toggleActive,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: toggleActive,
          },
        ]}>
        <Modal.Section>
          <Stack vertical>
            <DropZone
              accept='.csv'
              errorOverlayText='File type must be .csv'
              type='file'
              onDrop={() => {}}>
              <DropZone.FileUpload />
            </DropZone>
            <Checkbox
              checked={checked}
              label='Overwrite existing customers that have the same email or phone'
              onChange={handleCheckbox}
            />
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  )
}
